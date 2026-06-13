    if (typeof window.Chess !== "function") {
      window.Chess = class SimpleChess {
        constructor(fen) {
          this.board = {};
          this.active = "w";
          this.load(fen || SimpleChess.START);
        }

        load(fen) {
          const source = !fen || fen === "start" ? SimpleChess.START : fen;
          const parts = source.split(" ");
          this.board = {};
          this.active = parts[1] || "w";
          const ranks = parts[0].split("/");
          for (let r = 0; r < 8; r += 1) {
            let file = 0;
            for (const char of ranks[r]) {
              if (/\d/.test(char)) {
                file += Number(char);
              } else {
                const color = char === char.toUpperCase() ? "w" : "b";
                const type = char.toLowerCase();
                this.board[`${"abcdefgh"[file]}${8 - r}`] = { color, type };
                file += 1;
              }
            }
          }
        }

        fen() {
          const ranks = [];
          for (let rank = 8; rank >= 1; rank -= 1) {
            let row = "";
            let empty = 0;
            for (const file of "abcdefgh") {
              const piece = this.board[`${file}${rank}`];
              if (!piece) {
                empty += 1;
              } else {
                if (empty) {
                  row += empty;
                  empty = 0;
                }
                const letter = piece.type === "n" ? "n" : piece.type;
                row += piece.color === "w" ? letter.toUpperCase() : letter;
              }
            }
            if (empty) row += empty;
            ranks.push(row);
          }
          return `${ranks.join("/")} ${this.active} - - 0 1`;
        }

        turn() {
          return this.active;
        }

        get(square) {
          const piece = this.board[square];
          return piece ? { ...piece } : null;
        }

        moves(options = {}) {
          const color = this.active;
          const squares = options.square ? [options.square] : Object.keys(this.board).filter((sq) => this.board[sq].color === color);
          const moves = [];
          squares.forEach((square) => {
            const piece = this.board[square];
            if (!piece || piece.color !== color) return;
            this.pseudoMoves(square, piece).forEach((move) => {
              if (!this.leavesKingInCheck(move, color)) moves.push(move);
            });
          });
          return options.verbose ? moves : moves.map((move) => move.to);
        }

        move(input) {
          const legal = this.moves({ square: input.from, verbose: true }).find((move) => move.to === input.to);
          if (!legal) return null;
          const piece = this.board[input.from];
          const captured = this.board[input.to];
          delete this.board[input.from];
          const promotionRank = piece.color === "w" ? "8" : "1";
          const type = piece.type === "p" && input.to[1] === promotionRank ? (input.promotion || "q") : piece.type;
          this.board[input.to] = { color: piece.color, type };
          this.active = this.active === "w" ? "b" : "w";
          return { ...legal, captured: captured ? captured.type : undefined };
        }

        game_over() {
          return this.moves({ verbose: true }).length === 0;
        }

        in_checkmate() {
          return this.inCheck(this.active) && this.moves({ verbose: true }).length === 0;
        }

        isGameOver() {
          return this.game_over();
        }

        isCheckmate() {
          return this.in_checkmate();
        }

        pseudoMoves(square, piece) {
          const [file, rank] = SimpleChess.toCoord(square);
          const moves = [];
          const add = (f, r, onlyCapture = false, onlyEmpty = false) => {
            if (!SimpleChess.onBoard(f, r)) return false;
            const to = SimpleChess.toSquare(f, r);
            const target = this.board[to];
            if (onlyCapture && (!target || target.color === piece.color)) return false;
            if (onlyEmpty && target) return false;
            if (!target || target.color !== piece.color) {
              moves.push({ color: piece.color, from: square, to, piece: piece.type, captured: target ? target.type : undefined });
            }
            return !target;
          };

          if (piece.type === "p") {
            const dir = piece.color === "w" ? 1 : -1;
            const startRank = piece.color === "w" ? 2 : 7;
            if (add(file, rank + dir, false, true) && rank === startRank) add(file, rank + dir * 2, false, true);
            add(file - 1, rank + dir, true, false);
            add(file + 1, rank + dir, true, false);
            return moves;
          }

          if (piece.type === "n") {
            [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]].forEach(([df, dr]) => add(file + df, rank + dr));
            return moves;
          }

          if (piece.type === "k") {
            for (let df = -1; df <= 1; df += 1) {
              for (let dr = -1; dr <= 1; dr += 1) {
                if (df || dr) add(file + df, rank + dr);
              }
            }
            return moves;
          }

          const directions = {
            b: [[1, 1], [1, -1], [-1, 1], [-1, -1]],
            r: [[1, 0], [-1, 0], [0, 1], [0, -1]],
            q: [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]]
          }[piece.type] || [];
          directions.forEach(([df, dr]) => {
            let f = file + df;
            let r = rank + dr;
            while (SimpleChess.onBoard(f, r)) {
              if (!add(f, r)) break;
              f += df;
              r += dr;
            }
          });
          return moves;
        }

        leavesKingInCheck(move, color) {
          const moving = this.board[move.from];
          const captured = this.board[move.to];
          delete this.board[move.from];
          this.board[move.to] = moving;
          const inCheck = this.inCheck(color);
          this.board[move.from] = moving;
          if (captured) this.board[move.to] = captured;
          else delete this.board[move.to];
          return inCheck;
        }

        inCheck(color) {
          const kingSquare = Object.keys(this.board).find((sq) => {
            const piece = this.board[sq];
            return piece.color === color && piece.type === "k";
          });
          if (!kingSquare) return false;
          const enemy = color === "w" ? "b" : "w";
          return this.isAttacked(kingSquare, enemy);
        }

        isAttacked(square, byColor) {
          const [file, rank] = SimpleChess.toCoord(square);
          const enemyPieces = Object.entries(this.board).filter(([, piece]) => piece.color === byColor);
          return enemyPieces.some(([from, piece]) => {
            const [f, r] = SimpleChess.toCoord(from);
            if (piece.type === "p") {
              const dir = piece.color === "w" ? 1 : -1;
              return r + dir === rank && Math.abs(f - file) === 1;
            }
            if (piece.type === "n") return [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]].some(([df, dr]) => f + df === file && r + dr === rank);
            if (piece.type === "k") return Math.max(Math.abs(f - file), Math.abs(r - rank)) === 1;
            const dirs = {
              b: [[1, 1], [1, -1], [-1, 1], [-1, -1]],
              r: [[1, 0], [-1, 0], [0, 1], [0, -1]],
              q: [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]]
            }[piece.type] || [];
            return dirs.some(([df, dr]) => {
              let cf = f + df;
              let cr = r + dr;
              while (SimpleChess.onBoard(cf, cr)) {
                const sq = SimpleChess.toSquare(cf, cr);
                if (sq === square) return true;
                if (this.board[sq]) return false;
                cf += df;
                cr += dr;
              }
              return false;
            });
          });
        }

        static toCoord(square) {
          return ["abcdefgh".indexOf(square[0]) + 1, Number(square[1])];
        }

        static toSquare(file, rank) {
          return `${"abcdefgh"[file - 1]}${rank}`;
        }

        static onBoard(file, rank) {
          return file >= 1 && file <= 8 && rank >= 1 && rank <= 8;
        }
      };
      window.Chess.START = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1";
    }
  

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$BundledNode = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$Node = if (Test-Path $BundledNode) { $BundledNode } else { "node" }

& $Node (Join-Path $RepoRoot "scripts\build_public.js") @args

<#
.SYNOPSIS
One-click PowerShell launcher for ApexInvest frontend
#>
param(
  [ValidateSet('Install','Dev','Build','Test')]
  [string]$Action = 'Dev'
)
$Root = Split-Path -Parent $MyInvocation.MyCommand.Definition | Resolve-Path -Relative
Set-Location $Root\..
switch ($Action) {
  'Install' { corepack enable; corepack prepare pnpm@9.15.1 --activate; pnpm install --frozen-lockfile }
  'Dev' { pnpm dev }
  'Build' { pnpm build }
  'Test' { pnpm test }
}

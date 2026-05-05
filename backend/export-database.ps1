<#
.SYNOPSIS
  Export database BrainBook ra file SQL

.DESCRIPTION
  Script này export toàn bộ database brainbook ra file SQL

.EXAMPLE
  .\export-database.ps1
#>

param(
  [string]$PgBin = "",
  [string]$PgHost = "localhost",
  [int]$Port = 5432,
  [string]$OutputFile = "brainbook_export.sql"
)

function Find-PgDump {
  if ($PgBin -and (Test-Path (Join-Path $PgBin "pg_dump.exe"))) {
    return Join-Path $PgBin "pg_dump.exe"
  }
  $roots = @("C:\Program Files\PostgreSQL", "C:\Program Files (x86)\PostgreSQL")
  foreach ($root in $roots) {
    if (-not (Test-Path $root)) { continue }
    Get-ChildItem $root -Directory -ErrorAction SilentlyContinue | Sort-Object Name -Descending | ForEach-Object {
      $c = Join-Path $_.FullName "bin\pg_dump.exe"
      if (Test-Path $c) { return $c }
    }
  }
  return $null
}

$pgDump = Find-PgDump
if (-not $pgDump) {
  Write-Error "Không tìm thấy pg_dump.exe. Cài PostgreSQL hoặc truyền -PgBin 'C:\Program Files\PostgreSQL\18\bin'"
}

Write-Host "Dùng: $pgDump" -ForegroundColor DarkGray
Write-Host "Đang export database brainbook ra $OutputFile..." -ForegroundColor Yellow

$env:PGPASSWORD = "brainbook"
try {
  & $pgDump -h $PgHost -p $Port -U brainbook -d brainbook -f $OutputFile --verbose
  if ($LASTEXITCODE -eq 0) {
    Write-Host "Export thành công: $OutputFile" -ForegroundColor Green
    Write-Host "Kích thước file:" (Get-Item $OutputFile).Length "bytes" -ForegroundColor Cyan
  } else {
    Write-Error "Export thất bại với exit code: $LASTEXITCODE"
  }
}
finally {
  Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue
}

#!/usr/bin/env bash
set -euo pipefail

repo_dir=/opt/companylandingpage/repo
frontend_dir=/var/www/ngentik
turnstile_key_file=${1:?Turnstile site key file is required}

cd "$repo_dir"
git fetch origin dev
git checkout --force dev
git reset --hard origin/dev

dotnet restore api/Ngentik.ContactApi.csproj
dotnet publish api/Ngentik.ContactApi.csproj \
  -c Release \
  -o /opt/companylandingpage/api/publish \
  --no-restore

pushd "$repo_dir" >/dev/null
  npm ci
  export VITE_CONTACT_API_URL=https://landingpageapi.ngentik.com
  export VITE_TURNSTILE_SITE_KEY
  VITE_TURNSTILE_SITE_KEY=$(<"$turnstile_key_file") npm run build
popd >/dev/null

find "$frontend_dir" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
cp -a "$repo_dir/build/client/." "$frontend_dir/"
chown -R root:root "$frontend_dir"
find "$frontend_dir" -type d -exec chmod 755 {} +
find "$frontend_dir" -type f -exec chmod 644 {} +

systemctl restart ngentik-contact-api.service
systemctl is-active --quiet ngentik-contact-api.service
systemctl reload caddy
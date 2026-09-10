#!/usr/bin/env bash
set -euo pipefail

repo_dir=/opt/companylandingpage/repo
frontend_dir=/var/www/ngentik
api_publish_dir=/opt/companylandingpage/api/publish
turnstile_key_file=${1:?Turnstile site key file is required}
deploy_branch=${2:-main}

cd "$repo_dir"
git fetch origin "$deploy_branch"
git checkout --force -B "$deploy_branch" "origin/$deploy_branch"

dotnet restore api/Ngentik.ContactApi.csproj
dotnet publish api/Ngentik.ContactApi.csproj \
  -c Release \
  -o "$api_publish_dir" \
  --no-restore

chown -R www-data:www-data "$api_publish_dir"
find "$api_publish_dir" -type d -exec chmod 755 {} +
find "$api_publish_dir" -type f -exec chmod 644 {} +

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
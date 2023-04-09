#!/bin/bash
echo "[START]"
echo "---stopping app---"
docker compose -f docker-compose.yml -f docker-compose.prod.yml stop app
echo "---removing containers---"
docker compose rm -f
echo "---removing stale volumes---"
docker volume prune -f
echo "---rebuilding app---"
docker compose build app
echo "---restarting app---"
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --no-deps app
echo "[END]"
#!/bin/sh
set -eu

node packages/web/server.js &
web_pid=$!

node packages/socket/dist/index.cjs &
socket_pid=$!

shutdown() {
  kill -TERM "$web_pid" "$socket_pid" 2>/dev/null || true
  wait "$web_pid" 2>/dev/null || true
  wait "$socket_pid" 2>/dev/null || true
}

trap shutdown INT TERM

exit_code=0
while :; do
  if ! kill -0 "$web_pid" 2>/dev/null; then
    wait "$web_pid" || exit_code=$?
    break
  fi

  if ! kill -0 "$socket_pid" 2>/dev/null; then
    wait "$socket_pid" || exit_code=$?
    break
  fi

  sleep 1
done

shutdown
exit "$exit_code"


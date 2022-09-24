#!/bin/bash



# ---------------------------------------------------------
# Variables
# ---------------------------------------------------------

# Start duration timer
timeEllapsed="$(date +%s)"

# Version to update Nx to
version=${1}


# ---------------------------------------------------------
# Functions
# ---------------------------------------------------------

# Light green background with black text
function greenBackground {
  echo "\e[0;102;30m $1 \e[0m"
}

# Light red background with black text
function redBackground {
  echo "\e[0;101;30m $1 \e[0m"
}

# Light yellow background with black text
function yellowBackground {
  echo "\e[0;103;30m $1 \e[0m"
}

# Print the script duration time
function timeDuration {
  timeEllapsed="$(($(date +%s)-$timeEllapsed))"
  printf "\n\nDuration: ${timeEllapsed} seconds."
}

# The script has completed.
function finish() {
  timeDuration

  if [ $exitCode == 0 ]; then
    printf "\n\n$(greenBackground "Successful.")\n\n"
  else
    printf "\n\n$(redBackground "Failed with code $?.")\n\n"
  fi

  exit $exitCode
}


# ---------------------------------------------------------
# Workflow
# ---------------------------------------------------------

printf "\n\n$(yellowBackground "Updating Nx to ${version}.")\n\n"

pnpm nx reset
pnpm nx migrate @nrwl/workspace@${version}
pnpm install
pnpm update \
  @nrwl/devkit@${version} \
  @nrwl/js@${version}

cd libs/nx-mesh
pnpm update \
  @nrwl/cypress@${version} \
  @nrwl/devkit@${version} \
  @nrwl/js@${version} \
  @nrwl/linter@${version} \
  @nrwl/node@${version} \
  @nrwl/workspace@${version}
cd ../../

pnpm install
pnpm nx migrate --run-migrations
pnpm install

pnpm nx format:write --skip-nx-cache && \
  pnpm nx run nx-mesh:lint --fix --skip-nx-cache && \
  pnpm nx run nx-mesh:build --skip-nx-cache && \
  pnpm nx run nx-mesh:test --skip-nx-cache

pnpm nx repair

exitCode=$?

if [ $exitCode == 0 ]; then
  git add -A
  git commit --message "feat: upgrade nx to `${version}`"
fi

exitCode=$?

finish

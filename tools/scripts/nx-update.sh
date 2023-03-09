#!/bin/bash



# ---------------------------------------------------------
# Variables
# ---------------------------------------------------------

# Start duration timer
timeEllapsed="$(date +%s)"

# Version to update Nx to
version=${1}
dry=${dry}

exitCode=0


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

# Display helpful information.
function helpInfo {
  if [ $exitCode == 0 ]; then
    helpoptionsrows="\n  --%-30s %-40s"

    if [ "$help" = true ]; then
      printf "\n"
      printf "Usage: ./tools/scripts/nx-update.sh version [flags]"
      printf "\n"
      printf "       ./tools/scripts/nx-update.sh 14.5.6 --dry"
      printf "\n\n"
      printf "Options:"
      printf "\n"
      printf "$helpoptionsrows" "dry" "Run Nx update without commiting changes."
      printf "$helpoptionsrows" "help" "Show help text."
      printf "\n\n"
      exit 0
    else
      printf "\n"
      printf "Options:"
      printf "\n"
      printf "$helpoptionsrows" "version" "$version"
      printf "$helpoptionsrows" "dry" "$dry"
      printf "\n\n"
    fi
  fi
}

# The script has completed.
function finish {
  if [ $exitCode == 0 ]; then
    timeDuration
    printf "\n\n$(greenBackground "Successful.")\n\n"
  else
    printf "\n\n$(redBackground "Failed with code $?.")\n\n"
  fi

  exit $exitCode
}

# Reset Nx Cache
function resetCache {
  if [ $exitCode == 0 ]; then
    pnpm nx reset
  fi
}

# Get the Nx update details
function getNxUpdate {
  if [ $exitCode == 0 ]; then
    pnpm nx migrate ${version}
    exitCode=$?
  fi
}

# Install package updates
function installUpdates {
  if [ $exitCode == 0 ]; then
    pnpm install && \
      pnpm update \
        @nrwl/devkit@${version} \
        @nrwl/js@${version} && \
        cd packages/nx-mesh && \
        pnpm update \
          @nrwl/cypress@^${version} \
          @nrwl/devkit@^${version} \
          @nrwl/js@^${version} \
          @nrwl/linter@^${version} \
          @nrwl/node@^${version} \
          @nrwl/workspace@^${version} && \
        cd ../../ && \
        pnpm install

    exitCode=$?
  fi
}

function runMigrations {
  if [ $exitCode == 0 ]; then
    pnpm nx migrate --run-migrations && \
      pnpm install && \
      pnpm nx repair

    exitCode=$?
  fi
}

function testUpdate {
  if [ $exitCode == 0 ]; then
    pnpm nx-cloud record -- nx format:write --skip-nx-cache && \
      pnpm nx run nx-mesh:lint --fix --skip-nx-cache && \
      pnpm nx run nx-mesh:build --skip-nx-cache && \
      pnpm nx run nx-mesh:test --skip-nx-cache

    exitCode=$?
  fi
}

function commit {
  if [ $exitCode == 0 ] && [ "$dry" != true ]; then
    git add -A && \
      git commit --message "feat: upgrade nx to `${version}`"

    exitCode=$?
  fi
}

# ---------------------------------------------------------
# Workflow
# ---------------------------------------------------------

# Get input arguments and assign to variables
while [ $# -gt 0 ]; do
  if [[ $1 == *"--"* ]]; then
    param="${1/--/}"

    if [[ $2 = "" || $2 == *"--"* ]]; then
      declare $param=true
    else
      declare $param="$2"
    fi
  fi

  shift
done

helpInfo

resetCache
getNxUpdate
installUpdates
runMigrations
testUpdate

commit

finish

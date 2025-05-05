#!/usr/bin/env bash

# Exit on error
set -o errexit

# -- Node.js and pnpm Setup --
# Install pnpm (Render build instances usually have Node.js pre-installed,
# but you might want to specify a version using .node-version or .nvmrc file)
corepack enable # Recommended way to enable pnpm/yarn
corepack prepare pnpm@latest --activate # Ensure latest pnpm is available

# -- Install Dependencies --
bundle install
pnpm install # Install Node.js dependencies (including daisyui)

# -- Build Assets --
# assets:precompile will now run the tailwind build, which includes daisyui
bin/rails assets:precompile
bin/rails assets:clean

# -- Database Migrations --
# Consider moving this to a pre-deploy command on Render for zero-downtime deploys
# moved here: https://dashboard.render.com/web/srv-d0a2e995pdvs73bjup9g/settings
# bin/rails db:migrate
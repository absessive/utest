# README

# Setup
1. Clone and cd into the `utest` directory.
2. `bundle install` to install all the necessary dependencies.
3. `yarn install` to install all NPM dependencies.

# Database
1. `bundle exec rake db:create`
2. `bundle exec rake db:migrate`
3. Copy test files with the same file names to the `public/test_files` directory.
4. `bundle exec rake db:seed` to seed the database.

# Execution
Start the application with `bundle exec rails s`.

# Unit Tests
* Basic RSpecs to verify APIs, using the same seed data for tests

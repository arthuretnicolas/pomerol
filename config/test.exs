use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :pomerol, Pomerol.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :pomerol, Pomerol.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "pomerol_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# speed up password hashing
config :comeonin, :bcrypt_log_rounds, 4
config :comeonin, :pbkdf2_rounds, 1

config :pomerol, Pomerol.Mailer,
  adapter: Bamboo.TestAdapter

config :arc,
  bucket: "pomerol",
  virtual_host: false,
  arc_storage: Arc.Storage.S3

config :pomerol, :analytics, Pomerol.Analytics.TestAPI

import_config "test.secrets.exs"

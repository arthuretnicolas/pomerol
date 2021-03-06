use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :pomerol, Pomerol.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [
    {"node", [
      "node_modules/webpack/bin/webpack.js",
      "--watch-stdin",
      "--colors"
    ]},
    {"node", [
      "node_modules/webpack/bin/webpack.js",
      "--watch-stdin",
      "--colors",
      "--config",
      "webpack.server.config.js"
    ]}
  ]


# Watch static and templates for browser reloading.
config :pomerol, Pomerol.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# Configure your database
config :pomerol, Pomerol.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "pomerol_dev",
  hostname: "localhost",
  pool_size: 10

config :pomerol, Pomerol.Mailer,
  adapter: Bamboo.LocalAdapter

config :arc,
  bucket: "pomerol",
  virtual_host: false,
  arc_storage: Arc.Storage.S3

config :pomerol, :analytics, Pomerol.Analytics.InMemoryAPI

import_config "dev.secrets.exs"

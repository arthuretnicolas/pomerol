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

config :ueberauth, Ueberauth.Strategy.Google.OAuth,
  client_id: "217330109544-l6gh6agp436gc77i6gqje4t3ni6lluj6.apps.googleusercontent.com",
  client_secret: "ZnlJRbMDka-Upkp7EAaK9l4M"

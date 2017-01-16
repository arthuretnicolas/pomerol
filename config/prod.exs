use Mix.Config

# For production, we configure the host to read the PORT
# from the system environment. Therefore, you will need
# to set PORT=80 before running your server.
#
# You should also configure the url host to something
# meaningful, we use this information when generating URLs.
#
# Finally, we also include the path to a manifest
# containing the digested version of static files. This
# manifest is generated by the mix phoenix.digest task
# which you typically run after static files are built.
config :pomerol, Pomerol.Endpoint,
  http: [port: {:system, "PORT"}],
  url: [scheme: "https", host: "pomerol-dev.herokuapp.com", port: 443],
  force_ssl: [rewrite_on: [:x_forwarded_proto]],
  cache_static_manifest: "priv/static/manifest.json",
  secret_key_base: System.get_env("SECRET_KEY_BASE"),
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


# Do not print debug messages in production
config :logger, level: :info

# ## SSL Support
#
# To get SSL working, you will need to add the `https` key
# to the previous section and set your `:url` port to 443:
#
#     config :pomerol, Pomerol.Endpoint,
#       ...
#       url: [host: "example.com", port: 443],
#       https: [port: 443,
#               keyfile: System.get_env("SOME_APP_SSL_KEY_PATH"),
#               certfile: System.get_env("SOME_APP_SSL_CERT_PATH")]
#
# Where those two env variables return an absolute path to
# the key and cert in disk or a relative path inside priv,
# for example "priv/ssl/server.key".
#
# We also recommend setting `force_ssl`, ensuring no data is
# ever sent via http, always redirecting to https:
#
#     config :pomerol, Pomerol.Endpoint,
#       force_ssl: [hsts: true]
#
# Check `Plug.SSL` for all available options in `force_ssl`.

# ## Using releases
#
# If you are doing OTP releases, you need to instruct Phoenix
# to start the server for all endpoints:
#
#     config :phoenix, :serve_endpoints, true
#
# Alternatively, you can configure exactly which server to
# start per endpoint:
#
#     config :pomerol, Pomerol.Endpoint, server: true
#

config :pomerol, Pomerol.Mailer,
  adapter: Bamboo.LocalAdapter

# config :pomerol, Pomerol.Mailer,
#   adapter: Bamboo.MailgunAdapter,
#   api_key: System.get_env("MAILGUN_API_KEY"),
#   domain: System.get_env("MAILGUN_DOMAIN")

config :arc,
  bucket: "pomerol",
  virtual_host: false,
  arc_storage: Arc.Storage.S3

config :pomerol, :analytics, Pomerol.Analytics.TestAPI

# Configure your database
config :pomerol, Pomerol.Repo,
  adapter: Ecto.Adapters.Postgres,
  url: System.get_env("DATABASE_URL"),
  pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
  ssl: true

# Configure guardian
config :guardian, Guardian,
  secret_key: System.get_env("GUARDIAN_SECRET_KEY")

# Finally import the config/prod.secret.exs
# which should be versioned separately.
# import_config "prod.secrets.exs"

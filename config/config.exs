# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :pomerol,
  ecto_repos: [Pomerol.Repo]

# Configures the endpoint
config :pomerol, Pomerol.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "qqpmZTvGK8WKqHNVVScaPClFzYT+l9aEHsI6GEnPfo8ojio8fYdtNe28QiTJBVpv",
  render_errors: [view: Pomerol.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Pomerol.PubSub,
           adapter: Phoenix.PubSub.PG2]

config :pomerol, Pomerol.Gettext,
  locales: ~w(fr en),
  default_locale: "en"

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :guardian, Guardian,
  allowed_algos: ["HS512"], # optional
  verify_module: Guardian.JWT,  # optional
  issuer: "Pomerol.#{Mix.env}",
  ttl: { 30, :days },
  verify_issuer: true, # optional
  secret_key: to_string(Mix.env) <> "883z8H+L7TzqHAWozJ3lIORLjViEHH+ZfbOtll8Y7+afbASpdfZzp7gkgUzAKqAP",
  serializer: Pomerol.GuardianSerializer,
  permissions: %{default: [:read, :write]}

config :canary, repo: Pomerol.Repo
config :canary, unauthorized_handler: {Pomerol.AuthenticationHelpers, :handle_unauthorized}
config :canary, not_found_handler: {Pomerol.AuthenticationHelpers, :handle_not_found}

config :ueberauth, Ueberauth,
  providers: [
    # google: {Ueberauth.Strategy.Google, []}
    google: {Ueberauth.Strategy.Google, [
      callback_methods: ["POST"],
      callback_path: "/api/v1/auth/google/callback",
      callback_url: "http://localhost:8080" # Where my Brunch app is running
    ]}
  ]
# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

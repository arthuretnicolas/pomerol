defmodule Pomerol.Mixfile do
  use Mix.Project

  def project do
    [
      app: :pomerol,
      version: "0.0.1",
      elixir: "~> 1.3.4",
      elixirc_paths: elixirc_paths(Mix.env),
      compilers: [:phoenix, :gettext] ++ Mix.compilers,
      build_embedded: Mix.env == :prod,
      start_permanent: Mix.env == :prod,
      aliases: aliases(),
      deps: deps(),
      test_coverage: [tool: ExCoveralls]
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {Pomerol, []},
      applications: [
        :arc_ecto,
        :bamboo,
        :comeonin,
        :corsica,
        :cowboy,
        :ex_aws,
        :gettext,
        :httpoison,
        :logger,
        :phoenix,
        :phoenix_ecto,
        :phoenix_html,
        :phoenix_pubsub,
        :poison,
        :postgrex,
        :std_json_io,
        :timex,
        :timex_ecto,
        :translator,
        :ueberauth,
        :ueberauth_google
      ]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_),     do: ["lib", "web"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:arc, git: "https://github.com/stavro/arc.git", ref: "354d4d2e1b86bcd6285db3528118fe3f5db36cf5", override: true}, # Photo uploads
      {:arc_ecto, "~> 0.4.4"},
      {:bamboo, "~> 0.7"},
      {:canary, "~> 1.1.0"}, # Authorization
      {:comeonin, "~> 2.5"},
      {:corsica, "~> 0.5"},
      {:cowboy, "~> 1.0"},
      {:credo, "~> 0.5", only: [:dev, :test]}, # Code style suggestions
      {:ex_aws, "~> 0.4"}, # Amazon AWS
      {:excoveralls, "~> 0.5", only: :test}, # Test coverage
      {:ex_machina, "~> 1.0", only: :test}, # test factories
      {:gettext, "~> 0.11"},
      {:guardian, "~> 0.13.0"}, # Authentication (JWT)
      {:hackney, ">= 1.4.4"},
      {:httpoison, "~> 0.9.0"},
      {:phoenix, "~> 1.2.1"},
      {:phoenix_ecto, "~> 3.0"},
      {:phoenix_html, "~> 2.6"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},
      {:phoenix_pubsub, "~> 1.0"},
      {:postgrex, ">= 0.0.0"},
      {:poison, "~> 3.0", override: true},
      {:std_json_io, "~> 0.1", override: true},
      {:timex, "~> 3.0"},
      {:timex_ecto, "~> 3.0"},
      {:translator, github: "kenta-aktsk/translator"},
      {:ueberauth, "~> 0.4"},
      {:ueberauth_google, "~> 0.4"}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    ["ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
     "ecto.reset": ["ecto.drop", "ecto.setup"],
     "test": ["ecto.create --quiet", "ecto.migrate", "test"]]
  end
end

# Make sure all required plugins start before tests start running
# Needs to be called before ExUnit.start
{:ok, _} = Application.ensure_all_started(:ex_machina)

# By default, exclude S3 tests
# To run S3 tests, run `mix test --include requires_env`
ExUnit.configure exclude: [:requires_env]

ExUnit.start
Code.require_file("priv/repo/seeds.exs")
Ecto.Adapters.SQL.Sandbox.mode(Pomerol.Repo, :manual)

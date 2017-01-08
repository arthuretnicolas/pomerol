# Make sure all required plugins start before tests start running
# Needs to be called before ExUnit.start
{:ok, _} = Application.ensure_all_started(:ex_machina)

ExUnit.start
Code.require_file("priv/repo/seeds.exs")
Ecto.Adapters.SQL.Sandbox.mode(Pomerol.Repo, :manual)

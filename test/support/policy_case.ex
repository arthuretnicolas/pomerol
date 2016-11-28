defmodule Pomerol.PolicyCase do
  @moduledoc """
  This module defines the test case to be used by
  policy tests.

  You may define functions here to be used as helpers in
  your model tests. See `errors_on/2`'s definition as reference.

  Finally, if the test case interacts with the database,
  it cannot be async. For this reason, every test runs
  inside a transaction which is reset at the beginning
  of the test unless the test case is marked as async.
  """

  use ExUnit.CaseTemplate

  using do
    quote do
      import Pomerol.Factories
      import Pomerol.PolicyCase
    end
  end

  setup tags do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(Pomerol.Repo)

    unless tags[:async] do
      Ecto.Adapters.SQL.Sandbox.mode(Pomerol.Repo, {:shared, self()})
    end

    :ok
  end
end

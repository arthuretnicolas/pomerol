defmodule Pomerol.Repo.Migrations.AddNotNullConstraintOnCountriesCurrencyCode do
  use Ecto.Migration

  alias Pomerol.{Repo, Country}

  def change do
    # application is not started when compiling itself
    {:ok, _} = Application.ensure_all_started :timex

    Country
    |> Repo.all
    |> Enum.each(fn record ->
      Country.changeset(record)
      |> Ecto.Changeset.put_change(:default_currency_code, "XXX")
      |> Repo.update!
    end)

    # Set not null constraint on default_currency_code
    execute "ALTER TABLE countries ALTER COLUMN default_currency_code SET NOT NULL"
  end
end

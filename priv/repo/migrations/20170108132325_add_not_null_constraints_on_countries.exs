defmodule Pomerol.Repo.Migrations.AddNotNullConstraintsOnCountries do
  use Ecto.Migration

  import Timex
  alias Pomerol.{Repo, Country}

  def change do
    # application is not started when compiling itself
    {:ok, _} = Application.ensure_all_started :timex

    Country
    |> Repo.all
    |> Enum.each(fn record ->
      Country.changeset(record)
      |> Ecto.Changeset.put_change(:default_currency_locale, "en_US")
      |> Ecto.Changeset.put_change(:default_date_format, "US")
      |> Repo.update!
    end)

    # Set not null constraints
    execute "ALTER TABLE countries ALTER COLUMN default_currency_locale SET NOT NULL"
    execute "ALTER TABLE countries ALTER COLUMN default_date_format SET NOT NULL"
  end
end

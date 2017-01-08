defmodule Pomerol.Repo.Migrations.AddNotNullConstraintOnCountryCode do
  use Ecto.Migration

  import Timex
  alias Pomerol.{Repo, Country}

  def change do
    # application is not started when compiling itself
    # {:ok, _} = Application.ensure_all_started :timex
    #
    # Country
    # |> Repo.all
    # |> Enum.each(fn record ->
    #   Country.changeset(record)
    #   |> Ecto.Changeset.put_change(:country_code, Timex.format!(Timex.now, "%FT%T%:z", :strftime))
    #   |> Repo.update!
    # end)

    # Set not null constraint on default_currency_code
    execute "ALTER TABLE countries ALTER COLUMN country_code SET NOT NULL"
  end
end

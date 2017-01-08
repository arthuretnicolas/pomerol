defmodule Pomerol.Repo.Migrations.AddCurrencyLocaleAndTimeFormatToCountries do
  use Ecto.Migration

  def change do
    alter table(:countries) do
      add :default_date_format, :string
      add :default_currency_locale, :string
    end
  end
end

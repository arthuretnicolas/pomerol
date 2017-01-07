defmodule Pomerol.Repo.Migrations.AddDefaultCurrencyCodeToCountry do
  use Ecto.Migration

  def change do
    alter table(:countries) do
      add :default_currency_code, :string
    end
  end
end

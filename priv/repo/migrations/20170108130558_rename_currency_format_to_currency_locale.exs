defmodule Pomerol.Repo.Migrations.RenameCurrencyFormatToCurrencyLocale do
  use Ecto.Migration

  def change do
    alter table(:organizations) do
      remove :currency_format
      add :currency_locale, :string
      remove :datetime_format
      add :date_format, :string
    end
  end
end

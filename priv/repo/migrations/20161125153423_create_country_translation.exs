defmodule Pomerol.Repo.Migrations.CreateCountryTranslation do
  use Ecto.Migration

  def change do
    create table(:country_translations) do
      add :country_id, references(:countries, on_delete: :delete_all), null: false
      add :locale, :string, null: false
      add :name, :string, null: false

      timestamps
    end

    create index(:country_translations, [:country_id, :locale], unique: true)
  end
end

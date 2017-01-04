defmodule Pomerol.Repo.Migrations.CreateCountry do
  use Ecto.Migration

  def change do
    create table(:countries, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string, null: false

      timestamps
    end
  end
end

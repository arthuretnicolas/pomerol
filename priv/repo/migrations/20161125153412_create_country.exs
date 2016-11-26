defmodule Pomerol.Repo.Migrations.CreateCountry do
  use Ecto.Migration

  def change do
    create table(:countries) do
      add :name, :string, null: false

      timestamps
    end
  end
end

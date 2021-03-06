defmodule Pomerol.Repo.Migrations.CreateQuote do
  use Ecto.Migration

  def change do
    create table(:quotes, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :title, :string
      add :organization_id, references(:organizations, on_delete: :nothing, type: :binary_id), null: false
      timestamps
    end
  end
end

defmodule Pomerol.Repo.Migrations.CreateQuoteContact do
  use Ecto.Migration

  def change do
    create table(:quote_contacts, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :quote_id, references(:quotes, on_delete: :nothing, type: :binary_id), null: false
      add :contact_id, references(:contacts, on_delete: :nothing, type: :binary_id), null: false
      timestamps
    end

    create index :quote_contacts, [:quote_id, :contact_id], unique: true
  end
end

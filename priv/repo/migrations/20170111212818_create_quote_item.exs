defmodule Pomerol.Repo.Migrations.CreateQuoteItem do
  use Ecto.Migration

  def change do
    create table(:quote_items) do
      add :organization_item_id, references(:organization_items, on_delete: :nothing, type: :binary_id), null: false
      add :quote_id, references(:quotes, on_delete: :nothing, type: :binary_id), null: false
      add :position, :integer
      timestamps
    end
  end
end

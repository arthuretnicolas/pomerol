defmodule Pomerol.Repo.Migrations.AddInfosToQuote do
  use Ecto.Migration

  def change do
    alter table(:quotes) do
      add :currency, :string, null: false
      add :global_discount_percent, :decimal, default: 0, null: false
      add :expiry_date_time, :datetime, null: false
      add :amounts_entered, :string, null: false
      add :show_item_code, :boolean, default: true, null: false
      add :show_item_total, :boolean, default: true, null: false
      add :show_unit_price_and_quantity, :boolean, default: true, null: false
      add :sender_id, references(:users, on_delete: :nothing, type: :binary_id), null: false
    end
  end
end

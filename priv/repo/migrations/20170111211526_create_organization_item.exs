defmodule Pomerol.Repo.Migrations.CreateOrganizationItem do
  use Ecto.Migration

  def change do
    create table(:organization_items, primary_key: false) do
      add :id, :binary_id, primary_key: true

      add :type, :string

      add :option_type, :string, default: "not-optional", null: false
      add :code, :string
      add :title, :string
      add :description, :string
      add :price_unit, :integer
      add :quantity, :integer

      add :cost_price, :integer

      add :subscription_frequence, :integer
      add :subscription_type, :string
      add :subscription_duration, :integer

      add :editable_quantity, :boolean, default: false, null: false
      add :discount_percent, :integer

      add :archived, :boolean, default: false, null: false

      add :organization_sales_category_id, references(:organization_sales_categories, on_delete: :nothing, type: :binary_id), null: false
      add :organization_tax_rate_id, references(:organization_tax_rates, on_delete: :nothing, type: :binary_id), null: false
      add :organization_id, references(:organizations, on_delete: :nothing, type: :binary_id), null: false
      timestamps
    end
  end
end

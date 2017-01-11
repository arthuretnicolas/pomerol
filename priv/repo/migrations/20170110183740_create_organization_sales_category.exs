defmodule Pomerol.Repo.Migrations.CreateOrganizationSalesCategory do
  use Ecto.Migration

  def change do
    create table(:organization_sales_categories, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :description, :text      
      add :default, :boolean, default: false, null: false
      add :archived, :boolean, default: false, null: false
      add :organization_tax_rate_id, references(:organization_tax_rates, on_delete: :nothing, type: :binary_id), null: false
      add :organization_id, references(:organizations, on_delete: :nothing, type: :binary_id), null: false
      timestamps
    end

    create unique_index(:organization_sales_categories, [:organization_id, :name])
  end
end

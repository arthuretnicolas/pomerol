defmodule Pomerol.Repo.Migrations.DropNullConstraintsOnOrganizationItem do
  use Ecto.Migration

  def change do
    alter table(:organization_items) do
      remove :organization_sales_category_id
      remove :organization_tax_rate_id
      add :sales_category_id, references(:organization_sales_categories, on_delete: :nothing, type: :binary_id)
      add :tax_rate_id, references(:organization_tax_rates, on_delete: :nothing, type: :binary_id)
    end
  end

end

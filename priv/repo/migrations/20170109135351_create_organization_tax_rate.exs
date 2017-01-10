defmodule Pomerol.Repo.Migrations.CreateOrganizationTaxRate do
  use Ecto.Migration

  def change do
    create table(:organization_tax_rates, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :tax_rate_percent, :integer
      add :default, :boolean, default: false, null: false
      add :archived, :boolean, default: false, null: false
      add :organization_id, references(:organizations, on_delete: :nothing, type: :binary_id), null: false
      timestamps
    end

    create unique_index(:organization_tax_rates, [:organization_id, :name])
  end
end

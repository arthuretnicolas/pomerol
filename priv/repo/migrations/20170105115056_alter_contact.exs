defmodule Pomerol.Repo.Migrations.AlterContact do
  use Ecto.Migration

  def change do
    alter table(:contacts) do
      remove :address1
      remove :address2
      remove :city
      remove :zip
      remove :state
      remove :country_id
      add :archived, :boolean, null: false, default: false
      add :contact_company_id, references(:contact_companies, on_delete: :nothing, type: :binary_id)
    end
  end
end

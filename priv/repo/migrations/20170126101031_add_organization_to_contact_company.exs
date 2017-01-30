defmodule Pomerol.Repo.Migrations.AddOrganizationToContactCompany do
  use Ecto.Migration

  def change do
    alter table(:contact_companies) do
      add :organization_id, references(:organizations, on_delete: :nothing, type: :binary_id)
      # TODO : add not null constraint
    end
  end
end

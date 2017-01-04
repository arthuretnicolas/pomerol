defmodule Pomerol.Repo.Migrations.AddOrganizationMembership do
  use Ecto.Migration

  def change do
    create table(:organization_memberships, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :role, :string, null: false
      add :organization_id, references(:organizations, on_delete: :nothing, type: :binary_id), null: false
      add :member_id, references(:users, on_delete: :nothing, type: :binary_id), null: false

      timestamps
    end

    create index :organization_memberships, [:member_id, :organization_id], unique: true
  end
end

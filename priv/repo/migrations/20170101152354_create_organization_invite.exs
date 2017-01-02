defmodule Pomerol.Repo.Migrations.CreateOrganizationInvite do
  use Ecto.Migration

  def change do
    create table(:organization_invites) do
      add :email, :string, null: false
      add :role, :string, null: false
      add :message, :string
      add :token, :string, null: false
      add :pending, :boolean, null: false, default: true

      add :organization_id, references(:organizations, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)
      timestamps
    end
    
    create index(:organization_invites, [:token], unique: true)
    create index(:organization_invites, [:organization_id, :email], unique: true)
  end
end

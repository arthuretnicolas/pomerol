defmodule Pomerol.Repo.Migrations.CreateUserOrganization do
  use Ecto.Migration

  def change do
    create table(:user_organizations) do
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :organization_id, references(:organizations, on_delete: :delete_all), null: false

      timestamps
    end

    create index(:user_organizations, [:user_id])
    create index(:user_organizations, [:organization_id])
    create unique_index(:user_organizations, [:user_id, :organization_id])
  end
end

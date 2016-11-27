defmodule Pomerol.Repo.Migrations.RemoveUserFromOrganization do
  use Ecto.Migration

  def change do
    drop_if_exists index(:organizations, [:user_id])
    # create index(:organizations, [:user_id])
    alter table(:organizations) do
      remove(:user_id)
    end
  end
end

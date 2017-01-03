defmodule Pomerol.Repo.Migrations.AddAliasToOrganization do
  use Ecto.Migration

  def change do
    alter table(:organizations) do
      add :alias, :string
    end
  end
end

defmodule Pomerol.Repo.Migrations.AddLogoToOrganizations do
  use Ecto.Migration

  def change do
    alter table(:organizations) do
      add :logo, :string
    end
  end
end

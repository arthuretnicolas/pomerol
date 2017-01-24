defmodule Pomerol.Repo.Migrations.AddSelectedToOrganizationItem do
  use Ecto.Migration

  def change do
    alter table(:organization_items) do
      add :selected, :boolean
    end
  end
end

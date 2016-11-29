defmodule Pomerol.Repo.Migrations.AddInfosToOrganization do
  use Ecto.Migration

  def change do
    alter table :organizations do
      add :address, :string
      add :website, :string
      add :phone, :string
    end
  end
end

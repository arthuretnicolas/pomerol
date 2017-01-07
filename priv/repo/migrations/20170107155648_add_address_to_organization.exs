defmodule Pomerol.Repo.Migrations.AddAddressToOrganization do
  use Ecto.Migration

  def change do
    alter table(:organizations) do
      remove :address
      add :address1, :string
      add :address2, :string
      add :zip, :string
      add :city, :string
      add :state, :string
    end
  end
end

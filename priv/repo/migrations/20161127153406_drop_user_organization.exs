defmodule Pomerol.Repo.Migrations.DropUserOrganization do
  use Ecto.Migration

  def change do
    drop table(:user_organizations)
  end
end

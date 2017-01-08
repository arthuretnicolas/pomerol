defmodule Pomerol.Repo.Migrations.AlterOrganizationAlias do
  use Ecto.Migration

  alias Pomerol.{Repo, Organization}

  def up do
    # application is not started when compiling itself
    {:ok, _} = Application.ensure_all_started :timex

    # Update all organizations aliases with organization.name to ensure not_null condition on alias
    # Organization
    # |> Repo.all
    # |> Enum.each(fn record ->
    #   Organization.changeset(record)
    #   |> Ecto.Changeset.put_change(:alias, record.name)
    #   |> Repo.update!
    # end)

    alter table(:organizations) do
      modify :alias, :string, null: false
    end

  end

  def down do
    alter table(:organizations) do
      modify :alias, :string
    end
  end
end

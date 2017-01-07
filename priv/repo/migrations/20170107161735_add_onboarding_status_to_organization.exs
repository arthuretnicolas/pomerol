defmodule Pomerol.Repo.Migrations.AddOnboardingStatusToOrganization do
  use Ecto.Migration

  def change do
    alter table(:organizations) do
      add :onboarding, :boolean, null: false, default: false
    end
  end
end

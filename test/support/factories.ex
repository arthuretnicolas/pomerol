defmodule Pomerol.Factories do
  use Pomerol.JsonPayloadStrategy
  # with Ecto
  use ExMachina.Ecto, repo: Pomerol.Repo

  def organization_factory do
    %Pomerol.Organization{
      name: sequence(:name, &"Organization #{&1}")
    }
  end

  def organization_membership_factory do
    %Pomerol.OrganizationMembership{
      member: build(:user),
      organization: build(:organization),
      role: "owner"
    }
  end

  def organization_invite_factory do
    %Pomerol.OrganizationInvite{
      user: build(:user),
      organization: build(:organization),
      email: sequence(:email, &"email#{&1}"),
      role: "manager",
      token: Pomerol.Random.hex()
    }
  end

  def set_password(user, password) do
    hashed_password = Comeonin.Bcrypt.hashpwsalt(password)
    %{user | encrypted_password: hashed_password}
  end

  def user_factory do
    country = build(:country)
    country_translation = build(:country_translation, country: country)
    %Pomerol.User{
      first_name: sequence(:first_name, &"fn#{&1}"),
      last_name: sequence(:last_name, &"ln#{&1}"),
      email: sequence(:email, &"email-#{&1}@example.com"),
      locale: "fr",
      country_id: country.id
    }
  end

  def country_factory do
    %Pomerol.Country{
      name: sequence(:name, &"country#{&1}")
    }
  end

  def country_translation_factory do
    %Pomerol.CountryTranslation{
      country: build(:country),
      name: sequence(:name, &"country#{&1}"),
      locale: "en"
    }
  end

  def contact_factory do
    %Pomerol.Contact{
      first_name: sequence(:first_name, &"fn#{&1}"),
      last_name: sequence(:last_name, &"ln#{&1}"),
      email: sequence(:email, &"email#{&1}"),
      user: build(:user),
      organization: build(:organization),
      contact_type: "company"
    }
  end

end
